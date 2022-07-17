export interface BillingItemOld {
    product_id: string;
    product_name: string;
    unit: string;
    dialysis: string;
    lab: string;
    pharmacy: string;
    stock_in_hand: string;
    min_stock: string;
    max_stock: string;
    reorder_level: string;
    product_type: string;

}
export interface BillingItem {
    product_id: string;
    product_name: string;
    unit: string;
    dialysis: string;
    lab: string;
    pharmacy: string;
    stock_in_hand: string;
    min_stock: string;
    max_stock: string;
    reorder_level: string;
    product_type: string;

}
export interface billingProduct {
    product_id: '';
    amount: number;
    product_name: '';
    oc1: number;
    oc2: number;
    oc3: number;
    gross: number;
    d1: number;
    d2: number;
    d3: number;
    total_discount: number;
    netpay: number;
    amount_received: number

}

export interface Invoice {
    invoice_id: string;
    product_name: string;
    unit: string;
    dialysis: string;
    lab: string;
    pharmacy: string;
    stock_in_hand: string;
    min_stock: string;
    max_stock: string;
    reorder_level: string;
    product_type: string;

}
export interface Bu{
bu_id:string;
bu_name:string
}