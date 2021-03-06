class SessionsController < ApplicationController

  def create
    @session = User.find_by_email(params[:session][:email].downcase)
    if @session && @session.authenticate(params[:session][:password]) 
      session[:user_id] = @session.id
      redirect_to root_path, :notice => "Logged in!"
    else
      flash[:error] = "Invalid email or password"
      render 'new'
    end
  end

  def destroy
    session.clear
    redirect_to root_path, :notice => "Logged Out!"
  end
end
