import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from 'react-native-voice';

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status: 'Waiting...',
            started: '',
            results: [],
        };


        Voice.onSpeechStart = this.onSpeechStart.bind(this)
        //Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
        Voice.onSpeechResults = this.onSpeechResults.bind(this)

    }

    async _stopRecognition(e) {
        this.setState({
          status: 'Waiting...'
        });
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    }

    async _startRecognition(e) {
        this.setState({
            status: 'Listening...'
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    async onSpeechResults(e) {
        this.setState({
            status: e.value,
        });
        // await Voice.cancel()
        // await Voice.start()
    }

    onSpeechStart(e) {
        this.setState({
            status: 'Processing..',
        });
    }



    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.text}>You can say: Start, Pause, Stop, Retake, New take, Splice, Add </Text>
                <View style={{marginTop:20}}>
                    <Text style={styles.text}>{this.state.status}</Text>
                    {/*<Button onPress={this._startRecognition.bind(this)} title="Start">Start</Button>*/}
                    {/*<Button onPress={this._stopRecognition.bind(this)} title="Stop">Stop</Button>*/}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 26,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    status: {
        fontSize: 26,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
