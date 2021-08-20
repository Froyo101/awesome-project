import ReactOnRails from 'react-on-rails';
import App from '../bundles/Core/App';
import CoreAppStore from '../bundles/Core/state/CoreAppStore'

ReactOnRails.register({
  App,
});

ReactOnRails.registerStore({
  CoreAppStore,
});