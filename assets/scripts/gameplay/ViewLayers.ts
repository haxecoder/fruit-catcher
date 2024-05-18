import { _decorator, Component, Node } from "cc";

const { ccclass, property } = _decorator;

@ccclass('ViewLayers')
export class ViewLayers extends Component {

    @property(Node)
    public background: Node;

    @property(Node)
    public bucket: Node;

    @property(Node)
    public fruits: Node;

    @property(Node)
    public ui: Node;

    @property(Node)
    public touch: Node;

}