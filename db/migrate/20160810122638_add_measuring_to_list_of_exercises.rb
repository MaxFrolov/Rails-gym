class AddMeasuringToListOfExercises < ActiveRecord::Migration
  def change
    add_column :list_of_exercises, :measuring, :integer
  end
end
