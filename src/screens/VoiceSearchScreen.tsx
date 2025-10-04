import React from "react"
import { Button, Text, View } from "react-native"
import { useVoiceRecognition } from "../hooks/useVoiceRecognition"

const VoiceSearchScreen = () => {

    const voice = useVoiceRecognition();
    console.log(voice);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={
                {
                    fontSize: 20,
                    // marginBottom: 20
                    color: 'white'
                }
            }>{
                    voice.text ? voice.text : 'Press the button and start speaking'
                }</Text>
            <Button title="Start Voice Search" onPress={voice.start} />
        </View>
    )
}

export default VoiceSearchScreen