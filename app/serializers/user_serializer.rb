class UserSerializer < UserAvatarSerializer
  attributes :email, :role, :birthday, :first_name, :last_name, :phone

  def is_confirmed
    object.confirmed?
  end

  def birthday
    object.birthday.strftime('%F') if object.birthday.present?
  end
end
