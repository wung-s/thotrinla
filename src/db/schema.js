import Realm from 'realm';

class Song extends Realm.Object { }
Song.schema = {
  name: 'Song',
  properties: {
    key: 'int',
    stanzaCnt: 'int',
    firstStanza: 'string',
    secondStanza: 'string',
    thirdStanza: 'string',
    fourthStanza: 'string',
    chorus: 'string',
  }
  // Song.schema = {
  //     name: 'Song',
  //     properties: {
  //         name: 'string'
  //     }
};
class Animal extends Realm.Object { }
Animal.schema = {
  name: 'Animal',
  properties: {
    name: 'string'
  }
}

// export default Song;
export default new Realm({ schema: [Song, Animal] });


// let realm = new Realm({
    //   schema: [{ name: 'Song11', properties: {
        // key: 'number',
        // stanzaCnt: 'number',
        // firstStanza: 'string',
        // secondStanza: 'string',
        // thirdStanza: 'string',
        // fourthStanza: 'string',
        // chorus: 'string',

    //   } }]
    // });

    // data.forEach(currentSong => {
    //   // this.writeToDatabase(currentItem, realm);
    //   realm.write(() => {
    //     realm.create('Song', { ...currentSong });
    //   });
    // });
