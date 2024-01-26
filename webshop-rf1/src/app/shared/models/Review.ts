export interface Review{
    
    id: string;
    comment: string;
    customerId: string;
    productId: string;
    rating: number;
    

    /*constructor(UserID: number, ProductID: number, Points: number, Comment: string){
        this.UserID = UserID;
        this.ProductID = ProductID;
        this.Points = Points;
        this.Comment = Comment;
    }*/

}