class OrderedUsersController < ApiController
  load_resource

  def create
    @ordered_user.save
    render_resource_or_errors @ordered_user, include_order: true
  end

  def ordered_user_params
    params.allow_empty_require(:resource).permit(:first_name, :last_name, :company_name, :email, :phone, :city, :country,
                                                 :address, :order_notes)
  end
end
