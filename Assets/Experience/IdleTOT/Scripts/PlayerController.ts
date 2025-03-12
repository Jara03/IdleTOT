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
    GameObject, ControllerColliderHit
} from 'UnityEngine';

import GameManager, { GameState } from './GameManager';
import CanvasManager from "@assets/Experience/IdleTOT/Scripts/CanvasManager";

export default class PlayerController extends MonoBehaviour {

    @Header("Player Settings")
    @SerializeField private playerAnimator: RuntimeAnimatorController;

    private gameManager : GameManager;
    public canvasManager : CanvasManager;



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


    OnTriggerEnter(coll: Collider) {
        //End game if colliding with enemy
        if (coll.gameObject.tag == "Enemy") {

            GameObject.Destroy(coll.gameObject);
            this.canvasManager.UpdateScore();
        }
    }


    OnCollisionEnter(coll: Collision) {
        //End game if colliding with enemy
        if (coll.gameObject.tag == "Enemy") {

            GameObject.Destroy(coll.gameObject);
            this.canvasManager.UpdateScore();
        }
    }

    OnControllerColliderHit(coll: ControllerColliderHit) {
        //End game if colliding with enemy
        if (coll.gameObject.tag == "Enemy") {

            GameObject.Destroy(coll.gameObject);
            this.canvasManager.UpdateScore();
        }
    }


}
