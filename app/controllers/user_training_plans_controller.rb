class UserTrainingPlansController < ApiController
  load_resource

  def create
    @user_training_plan.save
    render_resource_or_errors @user_training_plan
  end

  def user_training_plan_params
    params.require(:resource).permit(:first_name, :last_name, :phone, :email, :number_of_weeks)
  end
end
