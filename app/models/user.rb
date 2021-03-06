class User < ApplicationRecord
  has_secure_password

  validates_presence_of :f_name
  validates_presence_of :l_name

  validates_presence_of :username
  validates_uniqueness_of :username

  validates_presence_of :email
  validates_uniqueness_of :email

  has_and_belongs_to_many :projects
end
