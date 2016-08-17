class UsersTrainingsController < ApiController
  load_resource

  def index
    render_resources @users_trainings.includes(:user_training_exercises => :user_training_exercise_sets)
  end
end
