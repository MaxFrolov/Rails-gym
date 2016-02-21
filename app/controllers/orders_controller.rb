class OrdersController < ApiController
  load_resource

  def show
    render_resource_data(@order)
  end

  def create
    @order.save
    render_resource_or_errors(@order)
  end

  def order_params
    params.require(:resource).permit(:order_status, :subtotal, :total, :payment_type,
                                     order_items_attributes: [:unit_price, :quantity, :order_status, :subtotal, :total, :product_id],
                                     ordered_user_attributes: [:first_name, :last_name, :company_name, :email, :phone, :city, :country, :address, :order_notes])
  end
end
