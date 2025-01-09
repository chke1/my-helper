import { onUnmounted, onMounted } from 'vue';
import mqttServer from '@/utils/mqtt-server.js';

export function useMqtt(url, config, subscribe) {
  const MQTT = new mqttServer(url, config, subscribe);

  onMounted(() => {
    window.ononline = () => {
      console.log('恢复了');
    };
    window.onoffline = () => {
      console.log('断网了');
    };
  });

  onUnmounted(() => {
    MQTT.end();
  });

  return MQTT;
}
