import { StackNavigator } from 'react-navigation';

import Index from './page/index';

/**
 * Top-level navigator. Renders the application UI.
 */
const MainNavigator = StackNavigator({
    Home: {
        screen: Index,
        navigationOptions:{
            header:null
        }
    }
});

export default MainNavigator;