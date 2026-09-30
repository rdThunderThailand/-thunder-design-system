/**
 * Minimal wiring example for an Ant Design project.
 * Everything below <App> inherits the Media Workspace theme.
 */
import { App, Badge, Button, ConfigProvider, Space } from 'antd';
import { mwStatus, mwTheme } from '@rdthunderthailand/mw-theme/antd';
import { MwIcon } from '@rdthunderthailand/mw-theme/icons';
import '@rdthunderthailand/mw-theme/global.css';

function Example() {
  const { message } = App.useApp();
  return (
    <Space direction="vertical" size={12} style={{ padding: 24 }}>
      <Badge status={mwStatus.online.badge} text={mwStatus.online.label} />
      <Badge status={mwStatus.warning.badge} text={mwStatus.warning.label} />
      <Badge status={mwStatus.offline.badge} text={mwStatus.offline.label} />
      <Space>
        <Button icon={<MwIcon.refresh />}>Refresh</Button>
        <Button type="primary" icon={<MwIcon.addChannel />} onClick={() => message.success('Channel added')}>
          Add channel
        </Button>
      </Space>
    </Space>
  );
}

export default function Root() {
  return (
    <ConfigProvider theme={mwTheme}>
      <App>
        <Example />
      </App>
    </ConfigProvider>
  );
}
