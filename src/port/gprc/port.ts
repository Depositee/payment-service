import GrpcService from "./type";
export default abstract class Port{
    constructor(private GrpcService:GrpcService ) {}
    getGrpcService():GrpcService{
        return this.GrpcService;
    }
}