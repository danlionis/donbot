import { ArgType } from "../../parser/argtype";
import { Duration } from "../../utils/duration";

export let Number: ArgType = {
  name: "number",
  resolve: async (v) => {
    const res = parseFloat(v);
    if (isNaN(res)) {
      return undefined;
    }

    return res;
  }
};

export let Member: ArgType = {
  name: "member",
  resolve: async (v, _, guild) => {
    // convert  <@!364727850923982849>
    // to       364727850923982849
    // remove <> @ !
    let id = v.substring(2, v.length - 1);
    if (id[0] === "!") {
      id = id.substr(1);
    }

    const member = (await guild.fetchMember(id).catch((e) => {})) || undefined;

    return member;
  }
};

export let DurationType: ArgType = {
  name: "duration",
  resolve: async (v) => {
    return new Duration(v).millis;
  }
};
