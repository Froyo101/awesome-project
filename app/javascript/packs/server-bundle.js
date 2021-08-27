import ReactOnRails from 'react-on-rails';
import ServerApp from '../bundles/Core/ServerApp';
import CoreAppStore from '../bundles/Core/state/CoreAppStore'

ReactOnRails.register({
  ServerApp,
});

ReactOnRails.registerStore({
  CoreAppStore,
});