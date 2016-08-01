class CreateUsersTrainings < ActiveRecord::Migration
  def change
    create_table :users_trainings do |t|
      t.timestamp :date
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
