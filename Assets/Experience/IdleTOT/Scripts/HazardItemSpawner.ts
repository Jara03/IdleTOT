import {Coroutine, GameObject, Mathf, MonoBehaviour, Object, Random, Time, Vector3, WaitForSeconds} from "UnityEngine";
import GameManager, {GameState} from "./GameManager";

export default class HazardPoolController extends MonoBehaviour {

    @Header("Enemy Settings")
    @SerializeField private prefab: GameObject;
    @SerializeField private ItemSpawnDelay: float = 3;

    private spawnPosition: Vector3 = new Vector3(0, -3, 0);

    private gameManager: GameManager;


    /** This coroutine will spawn enemies over time. */
    private coroutine: Coroutine;

    Start() {
        //Get GameManager singleton and add a listener to OnGameStateChange event
        this.gameManager = GameManager.Instance;
        this.gameManager.OnGameStateChange.addListener(this.CheckGameState);
        this.coroutine = this.StartCoroutine(this.SpawnItems());


    }


    private CheckGameState(newState: GameState) {
        switch(newState) {
            case GameState.GAME_PLAY:
                this.OnGamePlay();
                break;
            case GameState.GAME_OVER:
                this.OnGameOver();
                break;
        }
    }

    /** This will manage the enemies once the game starts. */
    private OnGamePlay() {

        //this.coroutine = this.StartCoroutine(this.SpawnItems());
    }



    /** Spawns the initial pool of GameObjects and deactivates them. */
    private CreateItem() {
            let temp = Object.Instantiate(this.prefab, this.transform) as GameObject;
            temp.SetActive(false);
            return temp;
    }

    /** Coroutine that spawns a new enemy from the pool. */
    private *SpawnItems() {
        while(true) {
            console.log("test pour spawn");
            yield null;
            //Get a deactivated enemy from the pool
            let item = this.CreateItem();
            if (item) {
                //Spawn in a random lane and activate
                item.transform.position = new Vector3(Mathf.Floor(Random.Range(-30, 30)), -3, Mathf.Floor(Random.Range(-30, 30)));
                item.SetActive(true);
            }
            yield new WaitForSeconds(this.ItemSpawnDelay);
        }
    }


    /** This will manage the enemies once the game ends. */
    private OnGameOver() {
        if(this.coroutine) {
            this.StopCoroutine(this.coroutine);
        }
    }
}