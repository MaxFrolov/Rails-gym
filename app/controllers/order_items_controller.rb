class OrderItemsController < ApiController
  load_resource

  def create
    @order = Order.new
    @order_item = @order.order_items.new(order_item_params[:items])
    @order.save
  end

  def update
    @order = Order.new
    @order_item = @order.order_items.find(params[:id])
    @order_item.update_attributes(order_item_params)
    @order_items = @order.order_items
  end

  private

  def order_item_params
    params.require(:resource).permit(items: [:unit_price, :quantity, :order_status, :subtotal, :total, :product_id])
  end
end

