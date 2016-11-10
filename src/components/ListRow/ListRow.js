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
    const { songNo, title, onSongSelect } = props;

    return (
        <TouchableOpacity style={styles.list} onPress={onSongSelect.bind(null, songNo)}>
            <Text style={styles.text}>{songNo} {title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#20C1BC',
        paddingHorizontal: 15,
        minHeight: 45,
        borderColor: 'white',
        borderTopWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }, seperator: {
        height: 1,
        backgroundColor: 'white'
    }
});


ListRow.propTypes = {
    songNo: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onSongSelect: PropTypes.func.isRequired
};

export default ListRow
