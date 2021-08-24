import ReactOnRails from 'react-on-rails';
import ClientApp from '../bundles/Core/ClientApp';
import CoreAppStore from '../bundles/Core/state/CoreAppStore'

ReactOnRails.register({
  ClientApp,
});

ReactOnRails.registerStore({
  CoreAppStore,
});