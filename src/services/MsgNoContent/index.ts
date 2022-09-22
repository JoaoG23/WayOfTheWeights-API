class MgsNoContent {

    private id:number;
    private tipo:string;
    private login:string;
    private senha:string;
    private instituicao:string;
    private obs:string;

    constructor( id:number, tipo:string, login:string, senha:string, instituicao:string, obs:string ) {
        this.id = id;
        this.login = login;
        this.senha = senha;
        this.tipo = tipo;
        this.instituicao = instituicao;
        this.obs = obs;
    }
}

export default MgsNoContent;