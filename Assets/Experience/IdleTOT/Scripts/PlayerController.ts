import {
    MonoBehaviour,
    Input,
    Vector3,
    Mathf,
    Time,
    Animator,
    Collider,
    RuntimeAnimatorController,
    Vector2,
    Touch,
    TouchPhase,
    Debug,
    WaitForSeconds,
    Rigidbody,
    ForceMode,
    Collision,
    GameObject, ControllerColliderHit, AudioSource, AudioClip
} from 'UnityEngine';

import GameManager, { GameState } from './GameManager';
import CanvasManager from "@assets/Experience/IdleTOT/Scripts/CanvasManager";
import {AudioPlayableAsset} from "UnityEngine.Timeline";

export default class PlayerController extends MonoBehaviour {

    @Header("Player Settings")
    @SerializeField private playerAnimator: RuntimeAnimatorController;

    private gameManager : GameManager;
    public canvasManager : CanvasManager;
    public Yeah : AudioSource;
    public Yclip : AudioClip ;

    async Start() {
        //Get GameManager singleton and add a listener to OnGameStateChange event
        this.gameManager = GameManager.Instance;

        this.gameManager.OnGameStateChange.addListener(this.CheckGameState);

    }

    Update() {
        //If game is playing, check for touch swipe and move player accordingly

    }

    /** Manages the player logic when the game state changes. @param newState */
    private CheckGameState(newState: GameState) {
        switch(newState) {
            case GameState.GAME_PLAY:
                this.OnGamePlay();
                break;
        }
    }

    /** This will manage the player once the game starts. */
    private OnGamePlay() {

    }


    OnControllerColliderHit(coll: ControllerColliderHit) {
        //End game if colliding with enemy
        if (coll.gameObject.tag == "Enemy") {

            GameObject.Destroy(coll.gameObject);
            this.canvasManager.UpdateScore();
            this.Yeah.PlayOneShot(this.Yclip)
        }
    }


}
