<template>
  <c-card isAffix>
    <template #header>
      提示：mqtt服务地址（
      <a href="https://gitee.com/ch-ke/my-server">my-server</a>
      ），每30分钟无新消息将清空数据，同时使用了浏览器指纹fingerprintjs，
    </template>
    <div class="warp">
      <div class="mqtt-status">
        <span>
          当前在线：<span class="is-success-text">{{ onlineState.onlineNum }}</span>
        </span>
        <span>
          已离开：<span class="is-error-text">{{ onlineState.offlineNum }}</span>
        </span>
      </div>
      <el-alert v-if="isAlert == 0" title="当前未连接到服务" type="error" />

      <div class="mqtt-warp">
        <c-empty v-if="!scrollerItems.length"></c-empty>
        <dynamic-scroller
          ref="scrollerRef"
          class="mqtt-scroller"
          :items="scrollerItems"
          key-field="id"
          :min-item-size="52"
          :emit-update="true"
          @resize="onScrollToBottom"
          @update="onScrollerUpdate"
        >
          <template #default="{ item, index, active }">
            <dynamic-scroller-item
              :class="['mqtt-scroller-item']"
              :size-dependencies="[item.id]"
              :item="item"
              :active="active"
              :data-index="index"
            >
              <template v-if="item.role === 'TARGET'">
                <div class="mqtt-scroller-target">
                  <img :src="item.userInfo.avatarUrl" alt="" />
                  <span class="mqtt-scroller-content">
                    <span class="is-push-time">{{ item.pushTime }}</span>
                    {{ item.content }}
                  </span>
                </div>
              </template>

              <template v-if="item.role === 'ONESELF'">
                <div class="mqtt-scroller-oneself">
                  <span class="mqtt-scroller-content">
                    <span class="is-push-time">{{ item.pushTime }}</span>
                    {{ item.content }}
                  </span>
                  <img :src="item.userInfo.avatarUrl" alt="" />
                </div>
              </template>
            </dynamic-scroller-item>
          </template>
        </dynamic-scroller>

        <div class="mqtt-textarea">
          <div class="mqtt-textarea__box">
            <el-input
              ref="textArea"
              v-model="sendTextarea"
              type="textarea"
              placeholder="请输入发送的内容！"
              resize="none"
              :rows="5"
              :maxlength="1000"
              @keydown.enter="handleEnter($event)"
              @keydown.up="handleArrow($event)"
              @keydown.down="handleArrow($event)"
              @keydown.left="handleArrow($event)"
              @keydown.right="handleArrow($event)"
              @input="handleInputChatText"
              @blur="handleInputBlur"
              @paste.capture="handlePaste"
              @focus="handleInputFocus"
            />
            <div class="mqtt-textarea__handle">
              <emoji-popover @change="onEmojiChange"></emoji-popover>
              <el-button type="success" plain @click="handleSend()">发 送</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </c-card>
</template>

<script setup>
import { onMounted, ref, reactive, nextTick } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import emojiPopover from '@/components/popover/emoji-popover.vue';
import { useMqtt } from '@/hooks/useMqtt/index.js';

import { useGlobalStore } from '@/pinia/modules/global';
const globalStore = useGlobalStore();

import { useUserStore } from '@/pinia/modules/user.js';
const userStore = useUserStore();

const mqttServer = useMqtt(
  'mqtt://localhost:1883',
  {
    connectTimeout: 4000, // 超时时间
    clientId: `${globalStore.visitorId}-${userStore.userInfo.accountId}-${Date.now()}`, // 不填默认随机生成一个ID
    username: 'admin', // 用户名
    password: '123456', // 密码
  },
  ['message', 'online'],
);

const scrollerRef = ref();

const scrollerItems = ref([]);

const onlineState = reactive({
  list: [],
  onlineNum: 0,
  offlineNum: 0,
});

const isAlert = ref(0);

const sendTextarea = ref('');

const updateParts = reactive({ viewEndIdx: 0 });

const onScrollToBottom = () => {
  nextTick(() => {
    scrollerRef.value && scrollerRef.value.scrollToBottom();
  });
};

const onScrollerUpdate = (viewStartIndex, viewEndIndex) => {
  updateParts.viewEndIdx = viewEndIndex;
};

const onEmojiChange = (e) => {
  sendTextarea.value += e;
};

const handleEnter = () => {};

const handleArrow = () => {};

const handleInputChatText = () => {};

const handleInputBlur = () => {};

const handlePaste = () => {};

const handleInputFocus = () => {};

const handleSend = async () => {
  let item = {
    visitorId: globalStore.visitorId,
    content: sendTextarea.value,
    userInfo: userStore.userInfo,
  };

  mqttServer.publish('client', item);
};

const handleMqttServerMessage = () => {
  mqttServer.onMessage = (topic, message) => {
    let data = JSON.parse(message);
    console.log(topic, data, 'topic, message');

    if (topic == 'message') {
      scrollerItems.value = scrollerItems.value.concat(
        data.map((v) => {
          let isvisitor = globalStore.visitorId == v.visitorId;
          let isaccount = userStore.userInfo.accountId == v.userInfo.accountId;
          return { ...v, role: isvisitor && isaccount ? 'ONESELF' : 'TARGET' };
        }),
      );
      onScrollToBottom();
    }

    if (topic == 'online') {
      onlineState.list = data;
      let _onlineNum = 0;
      let _offlineNum = 0;
      for (let index = 0; index < onlineState.list.length; index++) {
        if (onlineState.list[index].status == 0) _offlineNum++;
        if (onlineState.list[index].status == 1) _onlineNum++;
      }
      onlineState.onlineNum = _onlineNum;
      onlineState.offlineNum = _offlineNum;
    }
  };
};

const handleMqttServerStatus = () => {
  mqttServer.onError = (error) => {
    isAlert.value = 0;
  };
  mqttServer.onClose = (error) => {
    isAlert.value = 0;
  };
  mqttServer.onConnect = (error) => {
    isAlert.value = 1;
  };
};

onMounted(() => {
  mqttServer.init();
  handleMqttServerMessage();
  handleMqttServerStatus();
});
</script>

<style lang="scss" scoped>
.warp {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.mqtt-status {
  margin-bottom: 10px;
  & > span {
    margin-right: 10px;
    font-size: 14px;
  }
}
.mqtt-warp {
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px solid #eee;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.mqtt-scroller {
  flex: 1;
  height: 100%;
}

.mqtt-scroller-item {
  padding: 16px 6px 4px;
  box-sizing: border-box;
}

.mqtt-scroller-target,
.mqtt-scroller-oneself {
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    flex-shrink: 0;
    margin: 2px 10px;
    display: inline-block;
    vertical-align: bottom;
  }
}

.mqtt-scroller-target {
  justify-content: flex-start;
  .is-push-time {
    left: 0;
  }
}

.mqtt-scroller-oneself {
  justify-content: flex-end;
  .is-push-time {
    right: 0;
  }
}

.mqtt-scroller-content {
  line-height: 22px;
  padding: 6px 12px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgb(0, 0, 0, 0.06);
  border-radius: 8px;
  position: relative;
  @include useLineFeed();

  &:hover {
    .is-push-time {
      opacity: 1;
    }
  }
}

.is-push-time {
  display: inline-block;
  position: absolute;
  color: #666;
  font-size: 12px;
  top: -20px;
  opacity: 0;
  @include useNoLineFeed;
}

.mqtt-textarea {
  border-top: 1px solid #eee;
  padding: 12px;
  box-sizing: border-box;

  &__box {
    border: 1px solid #eee;
    border-radius: 4px;
  }

  :deep(.el-textarea) {
    border: none;
    outline: none;
  }

  :deep(.el-textarea__inner) {
    box-shadow: none;
    padding: 10px 14px;
    box-sizing: border-box;
  }

  &__handle {
    padding: 4px 12px 8px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__emoji {
    width: 20px;
    height: 20px;
  }
}
</style>
