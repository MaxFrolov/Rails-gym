class PlansController < ApiController
  load_resource

  def create
    @plan.save
    render_resource_or_errors(@plan)
  end

  def plan_params
    params.allow_empty_require(:resource).permit(:first_name, :last_name, :email, :phone, :plan)
  end
end
