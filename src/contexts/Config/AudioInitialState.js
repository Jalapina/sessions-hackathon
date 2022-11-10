export default {
    touchEnabled: false,
    midiEnabled: false,
    midiInputs: null,
    midiChannel: 10,
    ctx: null,
    numPads: 16,
    banks: 4,
    currentbank: 1,
    gridPadsArr: [],
    players: {},
    editMode: false,
    osc: null,
    sources: {},
    selectedPad: 0,
    analyser: null,
    recMode: false,
    isRecording: false,
    isMonitoring: true,
    recorder: null,
    monitor: null
}