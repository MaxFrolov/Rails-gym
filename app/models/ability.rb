class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    # Authorized user
    if user.persisted?
      can :index, User
      can [:show, :update, :destroy], User, id: user.id
    end
    can :index, Blog
  end
end
