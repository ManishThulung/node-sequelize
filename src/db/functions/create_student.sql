CREATE OR REPLACE FUNCTION create_or_update_studenttt(
    student_id INT,
    student_fullName VARCHAR,
    student_age INT,
    course_id INT,
    course_name VARCHAR
)
RETURNS VARCHAR
AS $$
DECLARE
    created_course_id INT;
BEGIN
    IF course_id IS NOT NULL AND EXISTS(SELECT 1 FROM courses WHERE id = course_id AND "deletedAt" IS NULL) THEN
        UPDATE courses
        SET name = course_name
        WHERE id = course_id;

        IF student_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE id = student_id AND "deletedAt" IS NULL) THEN
            UPDATE students
            SET "fullName" = student_fullName, "courseId" = course_id
            WHERE id = student_id;
            RETURN 'updated successfully';
        ELSE
            IF student_id IS NULL THEN
                INSERT INTO students ("fullName", age, "courseId", "createdAt", "updatedAt", "deletedAt")
                VALUES (student_fullName, student_age, course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
                RETURN 'created successfully';
            ELSE
                RETURN "student id not found!";
            END IF;
        END IF;
    ELSE
        IF course_id IS NULL THEN
            INSERT INTO courses ("name", "createdAt", "updatedAt", "deletedAt")
            VALUES (course_name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
            RETURNING "id" INTO created_course_id;

            IF student_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE id = student_id AND "deletedAt" IS NULL) THEN
                UPDATE students
                SET "fullName" = student_fullName, "courseId" = created_course_id
                WHERE id = student_id;
                RETURN 'updated successfully';
            ELSE
                IF student_id IS NULL THEN
                    INSERT INTO students ("fullName", age, "courseId", "createdAt", "updatedAt", "deletedAt")
                    VALUES (student_fullName, student_age, course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
                    RETURN 'created successfully';
                ELSE
                    RETURN 'student id not found!';
                END IF;
            END IF;
        ELSE
            RETURN 'course id does not exist!';
        END IF;

    END IF;
END;
$$ LANGUAGE plpgsql;
