export interface Customer{
    customerId: string;
    userId: string; // Reference to the associated User
    customerName: {
        firstName: string,
        lastName: string
    };
    homeAdress: string;
    phoneNumber: string;
}