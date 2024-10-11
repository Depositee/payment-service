export default interface Balance{
    user_id:number;
    balance:number;
    currency:string;
    created_at?:Date;
    updated_at?:Date;
}