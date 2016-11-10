import React, { Component, PropTypes } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    TextInput
} from 'react-native'
import { ListView } from 'realm/react-native'
import { Actions } from 'react-native-router-flux'
import NumberPad from '../../../components/NumberPad/NumberPad'

import realm from '../../../db/schema'
import ListBox from '../../../components/ListRow/ListRow'

var {
    height: deviceHeight
} = Dimensions.get("window");

class Search extends Component {
    constructor(props) {
        super(props);
        this.songInDB = realm.objects('Song').sorted('songNo');
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            searchKey: '',
            dataSource: ds.cloneWithRows([]),
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.queryDb = this.queryDb.bind(this);
    }

    handleTextChange(text) {
        console.log('val: ', text);
        this.setState({
            searchKey: text
        })
        if (this.state.searchKey.length >= 1)
            this.queryDb(this.state.searchKey);
    }

    queryDb(searchKey) {
        let newDs = this.songInDB.filtered(`title CONTAINS[c] "${searchKey}"`).sorted('songNo');
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
            dataSource: ds.cloneWithRows(newDs)
        });
    }

    showLyrics(selectedSongNo) {
        Actions.lyrics({ songNo: selectedSongNo })
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ padding: 10 }}>
                    <TextInput
                        style={{ height: 40 }}
                        placeholder="Search By Song Title"
                        onChangeText={this.handleTextChange}
                        value={this.state.searchKey}
                        autoFocus={true}
                        />
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => (
                        <ListBox
                            {...rowData}
                            onSongSelect={this.showLyrics}
                            />
                    )}
                    />
                <Text>{this.state.searchKey} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 3
    }
});


export default Search;