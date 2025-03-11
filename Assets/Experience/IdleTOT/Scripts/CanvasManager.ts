
import {Coroutine, GameObject, MonoBehaviour, WaitForSeconds} from "UnityEngine";
import {Button} from "UnityEngine.UI";
import {TMP_Text} from "TMPro";
import {CloudSaveStorage} from "Genies.Experience.CloudSave";
import GameManager, {GameState} from "@assets/Experience/IdleTOT/Scripts/GameManager";
export default class CanvasManager extends MonoBehaviour {


    @Header("Game Scene UI References")
    @SerializeField private scorePanel: GameObject;
    @SerializeField private scoreText: TMP_Text;

    private score: float = 0;

    private personalStorageKey: string = "PersonalStorageKey";
    private globalStorageKey: string = "GlobalStorageKey";
    private floatHighScoreKey: string = "FloatHighScoreKey";


    private personalStorage: CloudSaveStorage;
    private globalStorage: CloudSaveStorage;

    private gameManager: GameManager;

    /** This coroutine will increase and update the score over time. */
    private scoreCoroutine: Coroutine;

    Start() {
        //Get GameManager singleton and add a listener to OnGameStateChange event
        this.gameManager = GameManager.Instance;
        this.gameManager.OnGameStateChange.addListener(this.CheckGameState);

        this.gameManager.ChangeGameState(GameState.GAME_PLAY);


    }

    /** Manages the enemy logic when the game state changes. @param newState */
    private CheckGameState(newState: GameState) {
        switch(newState) {
            case GameState.LOADING:
                this.OnLoading();
                break;
            case GameState.GAME_PLAY:
                this.OnGamePlay();
                break;
        }
    }

    /** This will manage the canvas once the Avatar is loading. */
    private OnLoading() {
        this.scorePanel.SetActive(false);
    }

    private OnGamePlay() {
        this.scorePanel.SetActive(true);
        this.score = 0;
        this.UpdateScore()
    }


    public UpdateScore(): void {
        this.score += 1;
        this.scoreText.text = "Score: " + this.score;

        //TODO supprimer cette méthode et la remplacer par onTriggerEnter
        // ou la transformer en setter
    }


}
