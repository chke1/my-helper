import * as mqtt from 'mqtt/dist/mqtt';

export default class mqttServer {
  constructor(url, config, subscribe) {
    this.client = null;
    this.url = url;
    this.config = config;
    this.subscribe = subscribe;
  }

  // 初始化
  init() {
    this.client = mqtt.connect(this.url, this.config);

    // 连接
    this.client.on('connect', (e) => {
      console.log('连接成功', e);
      this.onConnect && this.onConnect(e);
      for (const item of this.subscribe) {
        this.client.subscribe(item, function (err) {
          if (!err) console.log(`${item}->订阅成功`);
        });
      }
    });

    // 接收消息
    this.client.on('message', (topic, message, event) => {
      console.log('接收消息', topic, message.toString(), event);
      if (this.onMessage) this.onMessage(topic, message.toString());
    });

    // 重连提醒
    this.client.on('reconnect', (error) => {
      console.log('正在重连', error);
      this.onReconnect && this.onReconnect(error);
    });

    // 连接失败
    this.client.on('error', (error) => {
      console.log('连接失败', error);
      this.onError && this.onError(error);
    });

    // 连接关闭
    this.client.on('close', (error) => {
      console.log('连接close', error);
      this.onClose && this.onClose(error);
    });
  }

  // 发布
  publish(topic, message) {
    console.log('发布消息', topic, message);
    this.client.publish(topic, typeof message === 'string' ? message : JSON.stringify(message));
  }

  // 关闭
  end() {
    console.log('关闭连接');
    this.client.end();
  }
}
