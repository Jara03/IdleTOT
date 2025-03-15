import {
    Camera,
    GameObject,
    MonoBehaviour,
    Object,
    Quaternion,
    Transform,
    Vector3,
    Screen,
    Canvas,
    Mathf
} from "UnityEngine";
import HazardItemSpawner from "@assets/Experience/IdleTOT/Scripts/HazardItemSpawner";

export default class Objectindicator extends MonoBehaviour {

    public objectIndicatorPrefab: GameObject ; // Préfabriqué de l'indicateur d'objet
    private objectIndicator: GameObject ; // Instance de l'indicateur d'objet
    private targetObject: Transform ; // Objet cible à suivre

    public Canvas : Canvas;
    public ItemSpawner: HazardItemSpawner;
    public playerPosition: Transform;
    public offset: int;
    public correctionAngle: int;

     Start()
    {

        // Créer l'indicateur d'objet a l'interieur du canvas
        this.objectIndicator = Object.Instantiate(this.objectIndicatorPrefab, this.transform) as GameObject;
        this.objectIndicator.transform.SetParent(this.Canvas.transform);

        this.objectIndicator.SetActive(false); // Désactiver par défaut

        // Initialiser l'objet cible à suivre
        this.targetObject = null;
    }

    Update()
    {
        this.targetObject = this.ItemSpawner.getNearestItemPosition(this.playerPosition.position);

        if (this.targetObject != null)
        {
            // Vérifier si l'objet cible est toujours actif (sur la scène)
            if (this.targetObject.gameObject.activeInHierarchy)
            {
                // Calculer la position de l'objet cible par rapport à la caméra du joueur
                let screenPos = Camera.main.WorldToScreenPoint(this.targetObject.position);

                // Vérifier si l'objet cible est visible à l'écran
                if (screenPos.z > 0 && screenPos.x > 0 && screenPos.x < Screen.width && screenPos.y > 0 && screenPos.y < Screen.height)
                {
                    // Si l'objet est visible, désactiver l'indicateur
                    this.objectIndicator.SetActive(false);
                }
                else
                {
                    // Si l'objet n'est pas visible, activer l'indicateur et le positionner à l'extérieur de l'écran vers l'objet
                    this.objectIndicator.SetActive(true);

                    // Calculer la direction de l'objet vers la caméra
                    let direction = this.targetObject.position - this.playerPosition.position;

                    // Calculer la position de l'indicateur à l'extérieur de l'écran dans la direction de l'objet
                    let screenPos = Camera.main.WorldToScreenPoint(this.targetObject.position);

                    // Assurez-vous que la position est à l'extérieur de l'écran
                    if (screenPos.x < 0) screenPos.x = 0 + this.offset;
                    if (screenPos.x > Screen.width) screenPos.x = Screen.width - this.offset;
                    if (screenPos.y < 0) screenPos.y = 0 + this.offset;
                    if (screenPos.y > Screen.height) screenPos.y = Screen.height - this.offset;


                    // Assurez-vous que l'indicateur reste dans les limites de l'écran
                    //screenPos.x = Mathf.Clamp(screenPos.x, 0, Screen.width - this.offset);
                    //screenPos.y = Mathf.Clamp(screenPos.y, 0, Screen.height- this.offset);



                    // Positionner l'indicateur sur l'écran
                    this.objectIndicator.transform.position = screenPos;

                }
            }
            else
            {
                // Si l'objet cible n'est plus actif, désactiver l'indicateur
                this.objectIndicator.SetActive(false);
                this.targetObject = null; // Réinitialiser l'objet cible
            }
        }
    }

    // Méthode pour définir l'objet cible
    SetTargetObject(target: GameObject)
    {
    this.targetObject = target.transform;
    }
}
