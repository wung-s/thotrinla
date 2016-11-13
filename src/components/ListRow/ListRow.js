import React, { PropTypes } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'


const ListRow = (props) => {
    // const { onClearAll, onNumPadTab, onSongSearch, searchKey, onCancel } = props;
    // console.log('props', props);
    const { songNo, title, onSongSelect, fontSize } = props;

    return (
        <TouchableOpacity style={styles.list} onPress={onSongSelect.bind(null, songNo)}>
            <View style={styles.labelWrapper}>
                <Text style={[styles.text, { flex: .2 }, { fontSize }]}>{songNo}</Text>
                <Text style={[styles.text, { flex: .8 }, , { fontSize }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        // backgroundColor: '#20C1BC',
        backgroundColor: 'white',
        // backgroundColor: 'mediumturquoise',
        // backgroundColor: 'whitesmoke',
        paddingHorizontal: 15,
        minHeight: 45,
        borderColor: 'darkgrey',
        borderBottomWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        elevation: 2
    },
    labelWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        color: 'darkgrey',
    }, seperator: {
        height: 1,
        backgroundColor: 'white'
    }
});


ListRow.propTypes = {
    songNo: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onSongSelect: PropTypes.func.isRequired,
    fontSize: PropTypes.number.isRequired
};
ListRow.defaultProps = {
    fontSize: 16
}

export default ListRow
