class OrderedUsersController < ApplicationController
  load_resource

  def create
    @ordered_user.save
    render nothing: true
  end
end
