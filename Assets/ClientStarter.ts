import { Room } from 'ZEPETO.Multiplay';
import { State } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldMultiplay } from 'ZEPETO.World'

export default class ClientStarter extends ZepetoScriptBehaviour {
    public MultiplayerVariable : ZepetoWorldMultiplay;

    private _room : Room;

    Start() {    
        this.MultiplayerVariable.RoomJoined += (room : Room) => {
            console.log("================== Client: Room Joined ================");

            this._room = room;
            room.AddMessageHandler("SERVER_GREETING", (message : string) => {
                console.log("================== Client: Server Greeting Received ================");
                console.log(message);
            });

            this._room.OnStateChange += this.OnStateChangeCallback;
        }
    }

    SendGreetingToServer() {
        console.log("================== Send Greeting to Server ===================");
        this._room.Send("CLIENT_GREETING", "Hi Server! I'm the Client!");
    }

    SendCollectionCoinToServer() {
        console.log("================== Send Collection Coin to Server ===================");
        this._room.Send("CLIENT_COLLECTION_COIN", 10);
    }

    OnStateChangeCallback(state: State, isFirst: boolean) {
        console.log("Coins on Server: " + state.collectionItems.coinsCount);
    }
}