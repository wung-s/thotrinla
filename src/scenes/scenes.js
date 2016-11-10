import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Actions, Scene, Modal } from 'react-native-router-flux'
import Routes from '../routes/index'

import NavigationDrawer from '../components/NavigationDrawer/NavigationDrawer'
import TabView from '../components/TabView'
import TabIcon from '../components/TabIcon'

import SearchContainer from '../routes/Search/containers/searchContainer'
import Icon from 'react-native-vector-icons/MaterialIcons'

const createScenes = () => {
    return Routes.childRoutes.map((route) => {
        console.log(route);
        return <Scene
            key={route.path}
            component={route.component}
            title={route.title}
            sceneStyle={styles.sceneStyle} />
    });
}

const navigationBarStyle = {
    backgroundColor: '#EE6055',
    // backgroundColor: '#DEE5E5'
}

const styles = StyleSheet.create({
    // container: {
    // 	flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    // 	alignItems: 'center',
    // },
    // sceneStyle: {
    // 	paddingTop: 55
    // },
    tabBarStyle: {
        backgroundColor: '#BBC8CA',
    },
    titleTextStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#9DCBBA',
    },
    sceneStyle: {
        paddingTop: 55
    }
});

const scenes = Actions.create(
    <Scene key="modal" component={Modal} >
        <Scene key="app" navigationBarStyle={navigationBarStyle}>
            <Scene
                key="tabbar"
                component={NavigationDrawer}
                title="Thotrin La"
                >
                <Scene
                    key="main"
                    tabs
                    tabBarStyle={styles.tabBarStyle}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                    hideTabBar
                    >
                    <Scene
                        key="tab1"
                        title="Home"
                        icon={TabIcon}
                        navigationBarStyle={navigationBarStyle}
                        titleStyle={styles.titleTextStyle}
                        drawerImage={require('../assets/images/drawer-burger.png')}
                        // drawerImage={require('../assets/images/left-arrow-key-white.png')}
                        backButtonImage={require('../assets/images/left-arrow-key-white.png')}
                        // drawerImage={{ uri: "file:///data/data/com.tangkhulthotrinla/cache/-lvo1bj_80@4x.png" }}
                        // rightButtonImage={{ uri: "file:///data/data/com.tangkhulthotrinla/cache/-lvo1bj_80@4x.png", }}
                        rightButtonImage={require('../assets/images/magnifying-glass.png')}
                        onRight={() => Actions.search()}
                        // onRight={() => Actions.searchModal()}
                        // rightButtonIconStyle={{ resizeMode: 'contain' }}
                        // rightTitle='Search'
                        // navBar={renderCustomNavBar()}
                        // hideNavBar={true}
                        initial={true}
                        >
                        <Scene
                            key={Routes.indexRoute.path}
                            component={Routes.indexRoute.component}
                            title={Routes.indexRoute.title}
                            sceneStyle={{ borderWidth: 1, borderStyle: 'solid', paddingTop: 55 }}
                            />
                        {createScenes()}
                    </Scene>
                </Scene>
            </Scene>
            {/*<Scene
                key="searchModal"
                direction="vertical"
                component={SearchContainer}
                title="Search"
                titleStyle={styles.titleTextStyle}
                icon={TabIcon}
                backButtonImage={require('../assets/images/left-arrow-key-white.png')}
                // hideNavBar
                />
            */}
        </Scene>
    </Scene>
)

export default scenes
