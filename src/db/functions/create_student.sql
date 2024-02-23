CREATE OR REPLACE FUNCTION create_or_update_student(
    student_id INT,
    student_fullName VARCHAR,
    student_age INT,
    course_id INT,
    course_name VARCHAR
    -- subjects VARCHAR[]
)
RETURNS VARCHAR
AS $$
BEGIN
    INSERT INTO students (id, "fullName", age)
    VALUES (student_id, student_fullName, student_age)
    ON CONFLICT (id)
    DO UPDATE
    SET "fullName" = EXCLUDED."fullName", age = EXCLUDED.age;

    INSERT INTO courses (id, name)
    VALUES (course_id, course_name)
    ON CONFLICT (id)
    DO UPDATE
    SET name = EXCLUDED.name;

    RETURN 'Student and Course upserted successfully';
END;
$$ LANGUAGE plpgsql;



-- CREATE OR REPLACE FUNCTION create_or_update_student(
--     student_id INT,
--     student_fullName VARCHAR,
--     student_age INT,
--     course_id INT,
--     course_name VARCHAR,
--     subjects VARCHAR[]
-- )
-- RETURNS VARCHAR
-- AS $$
-- BEGIN
--     IF student_id IS NOT NULL THEN
--         UPDATE students
--         SET
--             fullName = student_fullName,
--             age = student_age
--         WHERE id = student_id;

--         IF NOT FOUND THEN
--             RETURN 'Student not found';
--         END IF;

--         UPDATE courses
--         SET
--             name = course_name
--         WHERE id = course_id;

--         RETURN 'Student and Course updated successfully';
--     ELSE
--         INSERT INTO students (fullName, age) VALUES (student_fullName, student_age) RETURNING id INTO student_id;

--         INSERT INTO courses (id, name) VALUES (course_id, course_name) ON CONFLICT (id) DO UPDATE SET name = course_name;

--         RETURN 'Student and Course created successfully';
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;
