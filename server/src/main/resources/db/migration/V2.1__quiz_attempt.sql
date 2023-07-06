create table quiz_attempt
(
    attempt_id int auto_increment primary key,
    user_id    int not null,
    quiz_id    int not null,
    score_points      int default 0 not null,
    correct_answers int default 0 not null,
    incorrect_answers int default 0 not null,
    start_time timestamp not null,
    end_time timestamp,
    total_time_spent int
);

alter table quiz_attempt add constraint FK_quiz_attempt_user foreign key (user_id) references user (id) on update cascade on delete cascade;
alter table quiz_attempt add constraint FK_quiz_attempt_quiz foreign key (quiz_id) references quiz (id) on update cascade on delete cascade;