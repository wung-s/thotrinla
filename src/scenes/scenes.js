import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Actions, Scene, Modal } from 'react-native-router-flux'
import Routes from '../routes/index'

import NavigationDrawer from '../components/NavigationDrawer/NavigationDrawer'
import TabView from '../components/TabView'
import TabIcon from '../components/TabIcon'

import SearchContainer from '../routes/Search/containers/searchContainer'

console.log("Routes", Routes);

const createScenes = () => {
	return Routes.childRoutes.map((route) => {
		console.log(route);
		return <Scene
			key={route.path}
			component={route.component}
			title={route.title} />
	});
}

const navigationBarStyle = {
	backgroundColor: '#DEE5E5'
}

const styles = StyleSheet.create({
	container: {
		flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
		alignItems: 'center',
	},
	tabBarStyle: {
		backgroundColor: '#BBC8CA',
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
						navigationBarStyle={{ backgroundColor: '#FF715B' }}
						titleStyle={{ color: 'white' }}
						onRight={() => Actions.searchModal()}
						rightTitle='NumPad'
						initial
						>
						<Scene
							key={Routes.indexRoute.path}
							component={Routes.indexRoute.component}
							title={Routes.indexRoute.title}
							/>
						{createScenes()}
					</Scene>
				</Scene>
			</Scene>
			<Scene
				key="searchModal"
				direction="vertical"
				component={SearchContainer}
				title="Search"
				icon={TabIcon}
				hideNavBar />
		</Scene>
	</Scene>
)

export default scenes
