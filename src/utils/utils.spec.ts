import { Duration } from "./duration";
import { format_string } from "./formatter";

describe("utils", () => {
  describe("string formatter", () => {
    test("two inputs", () => {
      const input = "First: {0}, Second: {1}";
      const out = format_string(input, "1", "2");
      expect(out).toBe("First: 1, Second: 2");
    });

    test("single Input, multiple times", () => {
      const input = "First: {0}, Second: {0}";
      const out = format_string(input, "1");
      expect(out).toBe("First: 1, Second: 1");
    });

    test("not enough inputs", () => {
      const input = "First: {0}, Second: {1}";
      const out = format_string(input, "1");
      expect(out).toBe("First: 1, Second: ");
    });

    test("insert all", () => {
      const input = "Message: {}.";
      const out = format_string(input, "this is a message");
      expect(out).toBe("Message: this is a message.");
    });

    test("insert without format directive", () => {
      const input = "First: {0}, Rest: ";
      const out = format_string(input, "1", "2", "3", "4");
      expect(out).toBe("First: 1, Rest: ");
    });
  });

  describe("duration", () => {
    test("duration lengths", () => {
      expect(Duration.SECOND).toBe(1000);
      expect(Duration.MINUTE).toBe(60 * Duration.SECOND);
      expect(Duration.HOUR).toBe(60 * Duration.MINUTE);
      expect(Duration.DAY).toBe(24 * Duration.HOUR);
    });

    test("seconds", () => {
      const input = "5s";
      const duration = new Duration(input);
      expect(duration.millis).toBe(5000);
    });

    test("minutes", () => {
      const input = "5m";
      const duration = new Duration(input);
      expect(duration.millis).toBe(5 * Duration.MINUTE);
    });

    test("hours", () => {
      const input = "5h";
      const duration = new Duration(input);
      expect(duration.millis).toBe(5 * Duration.HOUR);
    });

    test("days", () => {
      const input = "5d";
      const duration = new Duration(input);
      expect(duration.millis).toBe(5 * Duration.DAY);
    });

    test("mixed", () => {
      const input = "1d2h3m4s";
      const duration = new Duration(input);
      const out =
        1 * Duration.DAY +
        2 * Duration.HOUR +
        3 * Duration.MINUTE +
        4 * Duration.SECOND;
      expect(duration.millis).toBe(out);
    });

    test("string representation", () => {
      const input = "1d5m2d";
      const duration = new Duration(input);
      expect(duration.toString()).toBe(input);
    });
  });
});
