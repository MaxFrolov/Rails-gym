class ListOfExercisesController < ApiController
  load_resource

  def index
    @list_of_exercises = @list_of_exercises.order :title
    @list_of_exercises = @list_of_exercises.where('LOWER(title) LIKE ?', "%#{params[:term].mb_chars.downcase.to_s}%") if params[:term].present?
    render_resources @list_of_exercises
  end
end
