import {Coroutine, GameObject, MonoBehaviour} from "UnityEngine";
import {Button} from "UnityEngine.UI";
import {TMP_Text} from "TMPro";
import {CloudSaveStorage} from "Genies.Experience.CloudSave";
import GameManager, {Biomes, GameState, GameValue} from "@assets/Experience/IdleTOT/Scripts/GameManager";
import MenuManager from "@assets/Experience/IdleTOT/Scripts/MenuManager";
import HazardItemSpawner from "@assets/Experience/IdleTOT/Scripts/HazardItemSpawner";

export default class CanvasManager extends MonoBehaviour {


    @Header("Game Scene UI References")
    @SerializeField private scorePanel: GameObject;
    @SerializeField private scoreText: TMP_Text;

    @Header("Game Menu UI Elements")
    @SerializeField private menuButton: Button;
    @SerializeField private closeMenu: Button;
    @SerializeField private menuPanel: GameObject;

    private personalStorageKey: string = "PersonalStorageKey";
    private globalStorageKey: string = "GlobalStorageKey";
    private floatHighScoreKey: string = "FloatHighScoreKey";


    private personalStorage: CloudSaveStorage;
    private globalStorage: CloudSaveStorage;

    private gameManager: GameManager;
    public MenuManager: MenuManager;

    /** This coroutine will increase and update the score over time. */
    private scoreCoroutine: Coroutine;

    Start() {
        //Get GameManager singleton and add a listener to OnGameStateChange event

        this.gameManager = GameManager.Instance;
        this.gameManager.OnGameStateChange.addListener(this.CheckGameState);

        this.gameManager.ChangeGameState(GameState.GAME_PLAY);

        //open menu on click on menu button
        this.menuButton.onClick.AddListener(this.OpenMenu);
        this.closeMenu.onClick.AddListener(this.CloseMenu);


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
        this.scoreText.text = "Score: 0" ;
    }


    public UpdateScore(): void {

        if(this.gameManager.GameValues.get(GameValue.CURRENT_BIOME) == Biomes.TOT){
            this.gameManager.UpdateGameValue(GameValue.SCORE, +this.gameManager.GameValues.get(GameValue.SECONDS_PER_WIN));

            this.scoreText.text = "Score: " + this.gameManager.GameValues.get(GameValue.SCORE);
            this.MenuManager.UpdateTotalScore(this.gameManager.GameValues.get(GameValue.SCORE));

        }else{
            this.gameManager.UpdateGameValue(GameValue.PLAINES_SCORE, +this.gameManager.GameValues.get(GameValue.SECONDS_PER_WIN));

            this.scoreText.text = "Score: " + this.gameManager.GameValues.get(GameValue.PLAINES_SCORE);
            this.MenuManager.UpdateTotalScore(this.gameManager.GameValues.get(GameValue.PLAINES_SCORE));
        }

    }


    public OpenMenu(): void {

        this.menuPanel.SetActive(true);
        this.menuButton.gameObject.SetActive(false);
        this.closeMenu.gameObject.SetActive(true);

    }

    public CloseMenu(): void {
        if(this.gameManager.GameValues.get(GameValue.CURRENT_BIOME) == Biomes.TOT){
            this.scoreText.text = "Score: " + this.gameManager.GameValues.get(GameValue.SCORE);
        }else{
            this.scoreText.text = "Score: " + this.gameManager.GameValues.get(GameValue.PLAINES_SCORE);
        }
        this.menuPanel.SetActive(false);
        this.menuButton.gameObject.SetActive(true);
        this.closeMenu.gameObject.SetActive(false);


    }




}
