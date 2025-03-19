import {
    Coroutine,
    GameObject,
    Mathf,
    MonoBehaviour,
    Object,
    Random,
    Transform,
    Vector3,
    WaitForSeconds
} from "UnityEngine";
import GameManager, {GameState, GameValue, Biomes} from "./GameManager";

export default class HazardItemSpawner extends MonoBehaviour {

    @Header("Enemy Settings")
    @SerializeField private TOTitem: GameObject;
                    private PLAINESitem: GameObject;
                    private MINEitem: GameObject;
                    private DESERTitem: GameObject;
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
        let temp = null;
            switch (this.gameManager.GameValues.get(GamesValue.CURRENT_BIOME)) {
                case (this.gameManager.Biomes.get(Biomes.TOT)):
                    temp = Object.Instantiate(this.TOTitem, this.transform) as GameObject;
                break;
                case (this.gameManager.Biomes.get(Biomes.PLAINES)):
                    temp = Object.Instantiate(this.PLAINESitem, this.transform) as GameObject;
                    break;
                case (this.gameManager.Biomes.get(Biomes.MINE)):
                    temp = Object.Instantiate(this.MINEitem, this.transform) as GameObject;
                    break;
                case (this.gameManager.Biomes.get(Biomes.DESERT)):
                    temp = Object.Instantiate(this.DESERTitem, this.transform) as GameObject;
                    break;
                    default:
                        temp = Object.Instantiate(this.TOTitem, this.transform) as GameObject;
                        break;
            }

            temp.SetActive(false);
            return temp;
    }

    /** Coroutine that spawns a new enemy from the pool. */
    private *SpawnItems() {
        while(true) {
            yield null;
            //Get a deactivated enemy from the pool
            let item = this.CreateItem();
            if (item) {
                //Spawn in a random lane and activate
                item.transform.position = new Vector3(Mathf.Floor(Random.Range(-30, 30)), -3, Mathf.Floor(Random.Range(-30, 30)));
                item.SetActive(true);
            }
            yield new WaitForSeconds(this.gameManager.GameValues.get(GameValue.SPAWN_RATE));
        }
    }

    public getNearestItemPosition(playerPosition: Vector3): Transform {
        let nearestItem: GameObject = null;
        let nearestDistance: number = 1000;

        for (let i = 0; i < this.transform.childCount; i++) {
            let item = this.transform.GetChild(i).gameObject;
            if (item.activeSelf) {
                let distance = Vector3.Distance(playerPosition, item.transform.position);
                if (distance < nearestDistance) {
                    nearestItem = item;
                    nearestDistance = distance;
                }
            }
        }
        return nearestItem.transform;
    }


    /** This will manage the enemies once the game ends. */
    private OnGameOver() {
        if(this.coroutine) {
            this.StopCoroutine(this.coroutine);
        }
    }
}
