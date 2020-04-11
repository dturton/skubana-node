export type ShippingSpeed =
  | 'TWO_DAY'
  | 'ECONOMY'
  | 'NEXT_DAY'
  | 'SFP'
  | 'FREIGHT'
  | 'SP_DELIVERY'
  | 'IN_PARCEL'
  | 'IN_FREIGHT';

export type OrderStatus =
  | 'CANCELLED'
  | 'DELETED'
  | 'CREATED'
  | 'EXCEPTION'
  | 'SHIPPED'
  | 'PICKING'
  | 'PICKED'
  | 'APPROVED'
  | 'DELIVERED';

export type CancelReasonType =
  | 'NO_INVENTORY'
  | 'SHIPPING_ADDRESS_UNDELIVERABLE'
  | 'CUSTOMER_EXCHANGE'
  | 'BUYER_CANCELLED'
  | 'BUYER_HAS_NOT_PAID'
  | 'GENERAL_ADJUSTMENT'
  | 'CARRIER_CREDIT_DECISION'
  | 'RISK_ASSESSMENT_INFORMATION_NOT_VALID'
  | 'CUSTOMER_RETURN'
  | 'MERCHANDISE_NOT_RECEIVED'
  | 'OTHER';

export type Environment = 'stage' | 'prod';

export interface Order {
  orderId: number;
  orderNumber: string;
  billDutiesToPayor: boolean;
  cancelReason?: null;
  confirmationCost: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  containsAlcohol: boolean;
  containsDryIce: boolean;
  createdDate: string;
  currency: string;
  customer: Customer;
  customField1?: null;
  customField2?: null;
  customField3?: null;
  customsDeclarationType: string;
  customsDeclarationItems?: null[] | null;
  customShipBilling?: null;
  deliveryConfirmation: string;
  discount: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  doNotPrepayPostage: boolean;
  dryIceWeight: number;
  external: boolean;
  fulfillmentSource: FulfillmentSource;
  gift: boolean;
  giftMessage?: null;
  height: number;
  holdUntilDate?: null;
  includeReturnLabel: boolean;
  insuranceCost: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  insuranceProvider: string;
  insuredValue: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  internalNotes?: null;
  labels?: LabelsEntity[] | null;
  length: number;
  modifiedDate: string;
  nonMachinable: boolean;
  notesFromBuyer?: null;
  notesToBuyer?: null;
  orderDate: string;
  orderItems?: OrderItemsEntity[] | null;
  orderStatus: string;
  orderTotal: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  paymentDate: string;
  paymentType?: null;
  releaseWithoutSignature: boolean;
  requestedShippingService: string;
  salesChannel: SalesChannel;
  saturdayDelivery: boolean;
  shipCompany?: null;
  shipDate?: null;
  shipEmail: string;
  shipMethod: ShipMethod;
  shipName: string;
  shippingCost: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  shipAddress1: string;
  shipAddress2: string;
  shipAddress3?: null;
  shipCity: string;
  shipState: string;
  shipZipCode: string;
  shipCountry: string;
  shipPhone: string;
  showPostage: boolean;
  unresolvedStatus: string;
  weight: number;
  width: number;
  shipment?: null;
  orderType: string;
  orderItemTotal: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  suppressChannelUpdate: boolean;
  shipByDate?: null;
  receiveByDate?: null;
  fraudAnalysis: string;
  addressType: string;
  internationalNonDeliveryAction: string;
  amzFbaShipmentId?: null;
  orderCartonIds?: null;
  orderCustomsDocuments?: null;
  relatedOrderIds?: null[] | null;
  subscription: boolean;
  pos: boolean;
}
export interface TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal {
  amount: number;
  currency: string;
}
export interface Customer {
  name: string;
  companyName?: null;
  emailAddresses?: string[] | null;
  customerId: number;
}
export interface FulfillmentSource {
  warehouseId: number;
  name: string;
}
export interface LabelsEntity {
  labelId: number;
  name: string;
  hexColor: string;
}
export interface OrderItemsEntity {
  orderItemId: number;
  listingName: string;
  listingSku: string;
  pickingStocks?: PickingStocksEntity[] | null;
  product: Product;
  quantityOrdered: number;
  tax: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  unitPrice: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  discount: TaxOrUnitPriceOrDiscountOrConfirmationCostOrInsuranceCostOrInsuredValueOrOrderTotalOrShippingCostOrOrderItemTotal;
  notes: string;
  purchaseOrderItemNumber?: null;
}
export interface PickingStocksEntity {
  productStock: ProductStock;
}
export interface ProductStock {
  active: boolean;
  availableQuantity: number;
  allocatedQuantity: number;
  drawRank: number;
  minStock: number;
  pickable: boolean;
  product: Product1;
  productStockId: number;
  quantity: number;
  quantityLocked: number;
  receivable: boolean;
  stockLocation: StockLocation;
  warehouseStockTotals: WarehouseStockTotals;
}
export interface Product1 {
  masterSku: string;
  name: string;
  productId: number;
  productType: string;
  upc: string;
  mpn?: null;
  description?: null;
  hazmat: boolean;
  productWeight: number;
}
export interface StockLocation {
  location: string;
  stockLocationId: number;
  warehouseId: number;
}
export interface WarehouseStockTotals {
  onHandQuantity: number;
  availableQuantity: number;
  allocatedQuantity: number;
  lockedQuantity: number;
  inTransitQuantity: number;
}
export interface Product {
  masterSku: string;
  name: string;
  productId: number;
  productType: string;
  upc: string;
  mpn: string;
  description: string;
  hazmat: boolean;
  productWeight: number;
}
export interface SalesChannel {
  salesChannelId: number;
  name: string;
  companyName: string;
  phoneNumber: string;
  type: string;
  connectionParams?: null;
}
export interface ShipMethod {
  shippingProviderId: number;
  shippingCarrier: string;
  shippingServiceId: number;
  packageTypeId: number;
  ltlFtlShipment?: null;
}

export interface CancelOrderRequest {
  cancelReason?: string;
  cancelReasonType: CancelReasonType;
  orderId?: number;
  refundOrdersOnChannels?: boolean;
  orderNumber?: string;
  salesChannelId: number;
  updateSalesChannels: boolean;
}
