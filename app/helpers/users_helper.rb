module UsersHelper
  def job_title_icon
    if @user.profile.job_title == "Developer"
      '<i class="fas fa-code"></i>'.html_safe
    elsif @user.profile.job_title == "Entrepreneur"
      '<i class="fas fa-lightbulb"></i>'.html_safe
    elsif @user.profile.job_title == "Investor"
      '<i class="fas fa-dollar-sign"></i>'.html_safe
    end
  end
end