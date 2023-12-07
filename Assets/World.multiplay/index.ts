import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";

export default class extends Sandbox {

    onCreate(options: SandboxOptions) {
        this.state.collectionItems.coinsCount = 0;

        this.onMessage("CLIENT_GREETING", (client: SandboxPlayer, message: string) => {
            console.log("================== Server: Client Greeting Received ================");
            console.log(message);
            
            client.send("SERVER_GREETING", "Hi Client! I'm the Server!");
        });

        this.onMessage("CLIENT_COLLECTION_COIN", (client: SandboxPlayer, message: number) => {
            this.state.collectionItems.coinsCount += message;
            console.log("================== Server: Client Collection Coin Received ================");
            console.log("================== Server Coin count is: " + this.state.collectionItems.coinsCount + " ===================");
        });

    }

    onJoin(client: SandboxPlayer) {
        
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        
    }
}