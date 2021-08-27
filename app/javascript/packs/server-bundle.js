import ReactOnRails from 'react-on-rails';
import ServerApp from '../bundles/Core/ServerApp';
import CoreAppStore from '../bundles/Core/state/CoreAppStore'

import Signup from '../bundles/Core/components/Signup';

ReactOnRails.register({
  ServerApp,
  Signup
});

ReactOnRails.registerStore({
  CoreAppStore,
});